package es.urjc.code.juegosenred;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebsocketEchoHandler extends TextWebSocketHandler {
	int con=0;
	int jugador=-1;
	WebSocketSession[] sessions=new WebSocketSession[4];
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println(session.getId()+" Message received: " + message.getPayload());
		String msg = message.getPayload();

		//session.sendMessage(new TextMessage("Polla "+con));
		boolean estaDentro=false;
		for(int i=0;i<con;i++) {
			if(session.getRemoteAddress().getAddress().toString().equals(sessions[i].getRemoteAddress().getAddress().toString())) {
				estaDentro=true;
				jugador=i;
			}
		}
		//System.out.println("esta dentro: "+estaDentro+" ID "+session.getRemoteAddress().getAddress());
		if(!estaDentro && con<4) {
			sessions[con]=session;
			session.sendMessage(new TextMessage("t"+con));
			con++;
		}
		
		for(int i=0;i<con;i++) {
			if(!session.getRemoteAddress().getAddress().toString().equals(sessions[i].getRemoteAddress().getAddress().toString())) {
				if(jugador==-1) {
					sessions[i].sendMessage(new TextMessage((con-1)+message.getPayload()));
				}else {
					sessions[i].sendMessage(new TextMessage(jugador+message.getPayload()));
				}
				
			}
			
		}
	}

}
