package nebula.model;

import java.time.LocalDate;




public class LikeDislike {
	

	private int id;
	private boolean isLike;
	private String ownerUsername;
	private LocalDate created;
	private VideoComm videoOrComment;
	private int videoOrCommentId;
	
	public LikeDislike(int id, boolean isLike,String ownerUsername, LocalDate created, VideoComm videoOrComment, int videoOrCommentId) {
		this.id = id;
		this.isLike = isLike;
		this.ownerUsername = ownerUsername;
		this.created = created;
		this.videoOrComment = videoOrComment;
		this.videoOrCommentId = videoOrCommentId;
	}
	
	public LikeDislike(boolean isLike,String ownerUsername, LocalDate created, VideoComm videoOrComment, int videoOrCommentId) {
		this.isLike = isLike;
		this.ownerUsername = ownerUsername;
		this.created = created;
		this.videoOrComment = videoOrComment;
		this.videoOrCommentId = videoOrCommentId;
	}

	public LikeDislike() {
		this.id = 0;
		this.isLike = true;
		this.created =  LocalDate.now();
		this.videoOrComment = VideoComm.VIDEO;
		this.videoOrCommentId = 0;
	}
	
	public LikeDislike(LikeDislike original) {
		this.id = original.id;
		this.isLike = original.isLike;
		this.ownerUsername = original.ownerUsername;
		this.created = original.created;
		this.videoOrComment = original.videoOrComment;
		this.videoOrCommentId = original.videoOrCommentId;
	}

	public String getOwnerUsername() {
		return ownerUsername;
	}

	public void setOwnerUsername(String ownerUsername) {
		this.ownerUsername = ownerUsername;
	}

	public int getVideoOrCommentId() {
		return videoOrCommentId;
	}

	public void setVideoOrCommentId(int videoOrCommentId) {
		this.videoOrCommentId = videoOrCommentId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isLike() {
		return isLike;
	}

	public void setLike(boolean isLike) {
		this.isLike = isLike;
	}

	public LocalDate getCreated() {
		return created;
	}

	public void setCreated(LocalDate created) {
		this.created = created;
	}


	public VideoComm getvideoOrComment() {
		return videoOrComment;
	}

	public void setvideoOrComment(VideoComm videoOrComment) {
		this.videoOrComment = videoOrComment;
	}

	

	
	
	
}
