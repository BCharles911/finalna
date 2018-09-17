package nebula.model;

import java.time.LocalDate;


public class Comment {

	private int id;
	private String content;
	private LocalDate created;
	private String ownerUsername;
	private int videoId;
	
	public Comment () {
		this.id = 0;
		this.content = "";
		this.created = LocalDate.now();
		this.ownerUsername = null;
		this.videoId = 0;
	}
	
	public Comment(int id, String content, LocalDate created, String ownerUsername, int videoId) {
		this.id = id;
		this.content = content;
		this.created = created;
		this.ownerUsername = ownerUsername;
		this.videoId = videoId;
		
	}
	
	public Comment(String content, LocalDate created, String ownerUsername, int videoId) {
		this.content = content;
		this.created = created;
		this.ownerUsername = ownerUsername;
		this.videoId = videoId;
		
	}
	
	public String getOwnerUsername() {
		return ownerUsername;
	}

	public void setOwnerUsername(String ownerUsername) {
		this.ownerUsername = ownerUsername;
	}

	public int getVideoID() {
		return videoId;
	}

	public void setVideoID(int videoId) {
		this.videoId = videoId;
	}

	public Comment(Comment original) {
		this.id = original.id;
		this.content = original.content;
		this.created = original.created;
		this.ownerUsername = original.ownerUsername;
		this.videoId = original.videoId;
	}

	public int getID() {
		return id;
	}

	public void setID(int iD) {
		id = iD;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDate getCreated() {
		return created;
	}

	public void setCreated(LocalDate created) {
		this.created = created;
	}


	
}
