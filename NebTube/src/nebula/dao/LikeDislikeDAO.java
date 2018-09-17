package nebula.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;

import nebula.model.*;

public class LikeDislikeDAO {

	public static ArrayList<LikeDislike> getAll() {
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ArrayList<LikeDislike> likes_dislikes = new ArrayList<LikeDislike>();
		
		try {

			ResultSet rset = null;
			String query = "SELECT * FROM like_dislike";
			pstmt = conn.prepareStatement(query);
			rset = pstmt.executeQuery();
			while(rset.next()) {
				int ID = rset.getInt("id");
				boolean isLike = rset.getInt("is_like") == 1? true : false;
				String ownerUsername = rset.getString("user_username");
				LocalDate created = LocalDate.parse(rset.getString("created"));
				VideoComm videoOrComment = VideoComm.valueOf(rset.getString("video_comment"));
				int videoOrCommentID = rset.getInt("video_comment_id");
				
				likes_dislikes.add(new LikeDislike(ID, isLike,ownerUsername, created, videoOrComment, videoOrCommentID));
			}
		}catch (SQLException e) { e.printStackTrace();}
		
		return likes_dislikes;
		
	}
	
	
	public static void uploadLikeDislike(LikeDislike likeDislike) {
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		try {
			String query = "INSERT INTO like_dislike(is_like,user_username,created,video_comment,video_comment_id) VALUES(?,?,?,?,?);";
			pstmt = conn.prepareStatement(query);
			pstmt.setInt(1, likeDislike.isLike() == true? 1: 0);
			pstmt.setString(2, likeDislike.getOwnerUsername());
			pstmt.setString(3, likeDislike.getCreated().toString());
			pstmt.setString(4, likeDislike.getvideoOrComment().toString());
			pstmt.setInt(5, likeDislike.getVideoOrCommentId());
			
			pstmt.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static void removeLikeDislike(VideoComm videoOrComment, int videoOrCommentId, String ownerUsername) {
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		try {
			String query = "DELETE FROM like_dislike WHERE video_comment = ? AND video_comment_id = ? AND user_username = ?;";
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, videoOrComment.toString());
			pstmt.setInt(2, videoOrCommentId);
			pstmt.setString(3, ownerUsername);
			
			pstmt.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	
	public static ArrayList<LikeDislike> getLikeDislikeForComment(int commentID) {
		ArrayList<LikeDislike> likesDislikesForComments = new ArrayList<LikeDislike>();
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		//System.out.println("Pristigli komentar u bazu: " + cmt.getContent() + cmt.getID());
		try {
			ResultSet rset = null;
			String query = "SELECT * FROM like_dislike WHERE video_comment = 'COMMENT' AND video_comment_id = ?";
			pstmt = conn.prepareStatement(query);
			pstmt.setInt(1, commentID);
			rset = pstmt.executeQuery();
			while(rset.next()) {
				int id = (rset.getInt("like_dislike_id"));
				boolean isLike = (rset.getInt("is_like")) == 1? true : false;
				String ownerUsername = rset.getString("user_username");
				LocalDate created = LocalDate.parse(rset.getString("created"));
				VideoComm videoOrComment = VideoComm.valueOf(rset.getString("video_comment"));
				int videoOrCommentID = rset.getInt("video_comment_id");
				
				LikeDislike Id = new LikeDislike(id,isLike,ownerUsername,created,videoOrComment, videoOrCommentID);
				likesDislikesForComments.add(Id);

			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return likesDislikesForComments;
	}
	
	public static ArrayList<LikeDislike> getAllForComment() {
		ArrayList<LikeDislike> likesDislikesForComments = new ArrayList<LikeDislike>();
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		try {
			ResultSet rset = null;
			String query = "SELECT * FROM like_dislike WHERE video_comment = 'COMMENT';";
			pstmt = conn.prepareStatement(query);
			rset = pstmt.executeQuery();
			while(rset.next()) {
				int id = (rset.getInt("like_dislike_id"));
				boolean isLike = (rset.getInt("is_like")) == 1? true : false;
				String ownerUsername = rset.getString("user_username");
				LocalDate created = LocalDate.parse(rset.getString("created"));
				VideoComm videoOrComment = VideoComm.valueOf(rset.getString("video_comment"));
				int videoOrCommentID = rset.getInt("video_comment_id");
				
				LikeDislike ld = new LikeDislike(id,isLike,ownerUsername,created,videoOrComment, videoOrCommentID);
				likesDislikesForComments.add(ld);
			}
			
			}catch (Exception e) {
				e.printStackTrace();
			}
			return likesDislikesForComments;
		}
}
	
