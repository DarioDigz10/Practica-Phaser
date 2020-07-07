package es.urjc.code.juegosenred;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebsocketEchoHandler extends TextWebSocketHandler {
  int contador = 0;
  int playerId = -1;

  WebSocketSession[] sessions = new WebSocketSession[4];

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    String msg = message.getPayload();
    System.out.println(session.getId() + " Message received: " + msg);

    boolean alreadyConected = false;
    for (int i = 0; i < contador; i++) {
      if (session.getRemoteAddress().getAddress().toString().equals(sessions[i].getRemoteAddress().getAddress().toString())) {
        alreadyConected = true;
        playerId = i;
      }
    }

	if (!alreadyConected && contador < 4) {
      sessions[contador] = session;
      session.sendMessage(new TextMessage("t" + contador));
      contador++;
    }

    for (int i = 0; i < contador; i++) {
      if (!session.getRemoteAddress().getAddress().toString().equals(sessions[i].getRemoteAddress().getAddress().toString())) {
        if (playerId == -1) sessions[i].sendMessage(new TextMessage((contador - 1) + message.getPayload()));
        else sessions[i].sendMessage(new TextMessage(playerId + message.getPayload()));
      }
    }
  }
}
