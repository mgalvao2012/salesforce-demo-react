@RestResource(urlMapping='/chat/mintToken')
global with sharing class ChatTokenBroker {
  global class ChatToken {
    public String token;
    public String sseUrl;
    public Long exp;
  }

  public class ChatTokenException extends Exception {
  }

  // The Connected App's Consumer Key. Same value as the SSE edge's
  // JWT_AUDIENCE config var.
  private static final String CONSUMER_KEY = '3MVG9LY8n98IRTt1_cmlOv3XnYeLkYArt_3_v3ztyrq89L5oY5X6AkFWLix.uCN3OkPg4rFRRAOeeZv3rPBWQ';

  // Self-signed cert in Setup → Certificate and Key Management. Its public
  // key is uploaded to the Connected App's "Use digital signatures" slot.
  private static final String SIGNING_CERT = 'chat_jwt_signer';

  // The org's login host — Salesforce verifies the assertion's `aud` matches
  // this exact value. For sandboxes, override via Chat_Settings__mdt below.
  private static final String DEFAULT_AUDIENCE = 'https://login.salesforce.com';

  private static final String SSE_URL_SETTING = 'Chat_SSE_Url';
  private static final String AUDIENCE_SETTING = 'Chat_JWT_Audience';

  @HttpPost
  global static ChatToken mintToken() {
    String assertion = buildSignedAssertion();
    String tokenEndpoint = audience() + '/services/oauth2/token';

    HttpRequest req = new HttpRequest();
    req.setEndpoint(tokenEndpoint);
    req.setMethod('POST');
    req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.setHeader('Accept', 'application/json');
    // Salesforce's JWT Bearer flow does NOT accept a `scope` parameter on
    // this POST; scopes come from the Connected App's OAuth policies.
    // `openid` must be selected there for the response to include id_token.
    req.setBody(
      'grant_type=' +
        EncodingUtil.urlEncode(
          'urn:ietf:params:oauth:grant-type:jwt-bearer',
          'UTF-8'
        ) +
        '&assertion=' +
        EncodingUtil.urlEncode(assertion, 'UTF-8')
    );
    req.setTimeout(10000);

    HttpResponse res = new Http().send(req);
    if (res.getStatusCode() < 200 || res.getStatusCode() >= 300) {
      throw new ChatTokenException(
        'Token endpoint returned ' + res.getStatusCode() + ': ' + res.getBody()
      );
    }

    Map<String, Object> body = (Map<String, Object>) JSON.deserializeUntyped(
      res.getBody()
    );
    String accessToken = (String) body.get('access_token');
    if (String.isBlank(accessToken)) {
      throw new ChatTokenException(
        'Token response missing access_token: ' + res.getBody()
      );
    }

    // Salesforce's JWT Bearer flow returns an opaque session-style access
    // token (not a JWT). The SSE edge verifies it by calling
    // /services/oauth2/userinfo, which returns 401 if the token is bad.
    // We give the React side a 30-min cache hint; the real expiry comes
    // from the org's session-timeout setting.
    ChatToken out = new ChatToken();
    out.token = accessToken;
    out.sseUrl = readSseUrl();
    out.exp = (DateTime.now().getTime() / 1000) + (30 * 60);
    return out;
  }

  // Builds and signs the JWT assertion: header.payload.signature, base64url.
  @TestVisible
  private static String buildSignedAssertion() {
    Long nowSec = DateTime.now().getTime() / 1000;
    // Salesforce accepts `exp` up to 5min in the future; we use 3min.
    Long expSec = nowSec + 180;

    // header is constant; precomputed base64url of {"alg":"RS256"}
    String header = base64url(Blob.valueOf('{"alg":"RS256"}'));

    Map<String, Object> claims = new Map<String, Object>{
      'iss' => CONSUMER_KEY,
      'sub' => UserInfo.getUserName(),
      'aud' => audience(),
      'exp' => expSec
    };
    String payload = base64url(Blob.valueOf(JSON.serialize(claims)));

    String signingInput = header + '.' + payload;

    Blob signature = Crypto.signWithCertificate(
      'RSA-SHA256',
      Blob.valueOf(signingInput),
      SIGNING_CERT
    );

    return signingInput + '.' + base64url(signature);
  }

  // Salesforce returns standard base64; JWT requires base64url (no padding).
  private static String base64url(Blob input) {
    return EncodingUtil.base64Encode(input)
      .replace('+', '-')
      .replace('/', '_')
      .replace('=', '');
  }

  private static String audience() {
    Chat_Settings__mdt cfg = Chat_Settings__mdt.getInstance(AUDIENCE_SETTING);
    if (cfg != null && !String.isBlank(cfg.Value__c))
      return cfg.Value__c;
    return DEFAULT_AUDIENCE;
  }

  private static String readSseUrl() {
    Chat_Settings__mdt cfg = Chat_Settings__mdt.getInstance(SSE_URL_SETTING);
    if (cfg == null || String.isBlank(cfg.Value__c)) {
      throw new ChatTokenException(
        'Chat_Settings__mdt:Chat_SSE_Url is not configured'
      );
    }
    return cfg.Value__c;
  }
}
