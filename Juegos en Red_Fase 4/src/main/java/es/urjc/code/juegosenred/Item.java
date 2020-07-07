package es.urjc.code.juegosenred;

public class Item {

	private long id;
	private String description;
	private boolean checked;

	public Item() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean getChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	@Override
	public String toString() {
		return " {id:" + id + ", description:" + description + ", checked:" + checked + "}";
	}
}
