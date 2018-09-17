package nebula.model;

import java.text.SimpleDateFormat;
import java.time.LocalDate;

public class Video {

	private int id;
	private String name;
	private String videoURL;
	private String imageURL;
	private String description;
	private Video_Visibility visibility;
	private boolean commentsAllowed;
	private boolean ratingVisibility;
	private boolean blocked;
	private int views;
	private LocalDate created;
	private String ownerUsername;
	
	
	public Video() {
		this.id = 0;
		this.name = "";
		this.videoURL = "";
		this.imageURL = "";
		this.description = "";
		this.visibility = Video_Visibility.PUBLIC;
		this.commentsAllowed = true;
		this.ratingVisibility = true;
		this.blocked = false;
		this.views = 0;
		this.created = LocalDate.now();
		this.ownerUsername = "";

	}
	
	public Video(String name, String videoURL, String imageURL, String description, Video_Visibility visibility, boolean commentsAllowed, boolean ratingVisibility, boolean blocked, int views, LocalDate created, String ownerUsername) {
		this.name = name;
		this.videoURL = videoURL;
		this.imageURL = imageURL;
		this.description = description;
		this.visibility = visibility;
		this.commentsAllowed = commentsAllowed;
		this.ratingVisibility = ratingVisibility;
		this.blocked = blocked;
		this.views = views;
		this.created = created;
		this.ownerUsername = ownerUsername;
	}
	
	public Video(int id,String name, String videoURL, String imageURL, String description, Video_Visibility visibility, boolean commentsAllowed, boolean ratingVisibility, boolean blocked, int views, LocalDate created, String ownerUsername) {
		this.id = id;
		this.name = name;
		this.videoURL = videoURL;
		this.imageURL = imageURL;
		this.description = description;
		this.visibility = visibility;
		this.commentsAllowed = commentsAllowed;
		this.ratingVisibility = ratingVisibility;
		this.blocked = blocked;
		this.views = views;
		this.created = created;
		this.ownerUsername = ownerUsername;
	}


	public Video(Video original) {
		this.id = original.id;
		this.name = original.name;
		this.videoURL = original.videoURL;
		this.imageURL = original.imageURL;
		this.description = original.description;
		this.visibility = original.visibility;
		this.commentsAllowed = original.commentsAllowed;
		this.ratingVisibility = original.ratingVisibility;
		this.blocked = original.blocked;
		this.views = original.views;
		this.ownerUsername = original.ownerUsername;
				
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getVideoURL() {
		return videoURL;
	}

	public void setVideoURL(String videoURL) {
		this.videoURL = videoURL;
	}

	public String getimageURL() {
		return imageURL;
	}

	public void setimageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public String getdescription() {
		return description;
	}

	public void setdescription(String description) {
		this.description = description;
	}

	public Video_Visibility getvisibility() {
		return visibility;
	}

	public void setvisibility(Video_Visibility visibility) {
		this.visibility = visibility;
	}

	public boolean iscommentsAllowed() {
		return commentsAllowed;
	}

	public void setcommentsAllowed(boolean commentsAllowed) {
		this.commentsAllowed = commentsAllowed;
	}

	public boolean isratingVisibility() {
		return ratingVisibility;
	}

	public void setratingVisibility(boolean ratingVisibility) {
		this.ratingVisibility = ratingVisibility;
	}

	public boolean isblocked() {
		return blocked;
	}

	public void setblocked(boolean blocked) {
		this.blocked = blocked;
	}

	public int getviews() {
		return views;
	}

	public void setviews(int views) {
		this.views = views;
	}

	public LocalDate getcreated() {
		return created;
	}

	public void setcreated(LocalDate created) {
		this.created = created;
	}

	public String getOwnerUsername() {
		return ownerUsername;
	}

	public void setOwnerUsername(String ownerUsername) {
		this.ownerUsername = ownerUsername;
	}

	
}
