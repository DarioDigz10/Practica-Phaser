package es.urjc.code.juegosenred;

public class User {
	public String name;
	public int id;
	public int contadorMensajes=0;

	
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", contadorMensajes=" + contadorMensajes + "]";
	}

    
}
