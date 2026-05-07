@isTest
private class ChatTokenBrokerTest {
  /**
   * NOTE: these tests require the self-signed certificate `chat_jwt_signer`
   * to exist in Setup → Certificate and Key Management. Apex's
   * Crypto.signWithCertificate() reads the cert at runtime and will throw
   * CryptoException("Could not find certificate ...") if it isn't there.
   * That happens before the HttpCalloutMock fires.
   */

  private class TokenSuccessMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest req) {
      HttpResponse res = new HttpResponse();
      res.setStatusCode(200);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(
        '{"access_token":"00DRK!fake-session-token",' +
          '"scope":"openid id api","token_type":"Bearer",' +
          '"instance_url":"https://example.my.salesforce.com",' +
          '"id":"https://login.salesforce.com/id/00DRK/005RK"}'
      );
      return res;
    }
  }

  private class TokenFailureMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest req) {
      HttpResponse res = new HttpResponse();
      res.setStatusCode(401);
      res.setBody('{"error":"invalid_client_id"}');
      return res;
    }
  }

  @isTest
  static void mintToken_returns_access_token_and_url_on_success() {
    Test.setMock(HttpCalloutMock.class, new TokenSuccessMock());

    Test.startTest();
    ChatTokenBroker.ChatToken out = ChatTokenBroker.mintToken();
    Test.stopTest();

    System.assertEquals(
      '00DRK!fake-session-token',
      out.token,
      'access_token from token endpoint'
    );
    System.assertNotEquals(
      null,
      out.sseUrl,
      'sseUrl populated from custom metadata'
    );
    System.assert(
      out.exp > (DateTime.now().getTime() / 1000),
      'exp hint is in the future'
    );
  }

  @isTest
  static void mintToken_throws_when_token_endpoint_rejects() {
    Test.setMock(HttpCalloutMock.class, new TokenFailureMock());

    Boolean threw = false;
    Test.startTest();
    try {
      ChatTokenBroker.mintToken();
    } catch (ChatTokenBroker.ChatTokenException e) {
      threw = true;
      System.assert(
        e.getMessage().contains('401'),
        'wraps non-2xx status in message'
      );
    }
    Test.stopTest();

    System.assert(threw, 'expected ChatTokenException on non-2xx');
  }
}
