package nebula.dao;



import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import nebula.model.*;

public class CommentDAO {

	public static int uploadComment(Comment comment) {
		int generatedID = 0;
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		
		try {
			String query = "INSERT INTO comment(content,created,user_username,video_id) VALUES (?,?,?,?)";
			pstmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
			
			pstmt.setString(1, comment.getContent());
			pstmt.setString(2, comment.getCreated().toString());
			pstmt.setString(3, comment.getOwnerUsername());
			pstmt.setInt(4, comment.getVideoID());
			
			pstmt.executeUpdate();

			ResultSet generatedKey = pstmt.getGeneratedKeys();
			while(generatedKey.next()) {
				generatedID = generatedKey.getInt(1);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return generatedID;
	}
	
	public static Map<Comment, LikeDislike> getCommentsForVideo(int id) {
		Map<Comment, LikeDislike> comment = new HashMap<Comment, LikeDislike>();
		ArrayList<LikeDislike> likesDislikes = new ArrayList<LikeDislike>();
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		
		try {
			ResultSet rset = null;
			String query = "SELECT * FROM comment INNER JOIN like_dislike ON comment.comment_id = like_dislike.video_comment_id WHERE video_comment = 'COMMENT' AND video_comment_id = ?;";
			pstmt = conn.prepareStatement(query);
			pstmt.setInt(1, id);
			rset = pstmt.executeQuery();
			System.out.println("Izgled queryja: " + pstmt.toString());
			while(rset.next()) {
				int index = 1;
				
				int commentID = rset.getInt(index++);
				String commentContent = rset.getString(index++);
				LocalDate commentCreated = LocalDate.parse(rset.getString(index++));
				String commentOwnerUsername = rset.getString(index++);
				int videoID = rset.getInt(index++);
				
				int likeDislikeID = rset.getInt(index++);
				boolean isLike = rset.getInt(index++) == 1? true : false;
				String likeOwnerUsername = rset.getString(index++);
				LocalDate likeCreated = LocalDate.parse(rset.getString(index++));
				String likeVideoOrCommentString = rset.getString("video_comment");
				VideoComm likeVideoOrComment = VideoComm.VIDEO;
				switch(likeVideoOrCommentString) {
				case "VIDEO":
					likeVideoOrComment = VideoComm.VIDEO;
					break;
				case "COMMENT":
					likeVideoOrComment = VideoComm.COMMENT;
					break;
				} 
				
				int likeVideoOrCommentID = rset.getInt("video_comment_id");
				
				comment.put(new Comment(commentID, commentContent, commentCreated, commentOwnerUsername,videoID), new LikeDislike(isLike, likeOwnerUsername, likeCreated, likeVideoOrComment, likeVideoOrCommentID));
				
				
			}
		}catch (SQLException e) { e.printStackTrace();}
		
		return comment;
		
		
	}
	
	
	public static void updateForComment(String action,String content, int id) {
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		try {
			String query = "";
			switch(action) {
			case "update":
				query = "UPDATE comment SET content = ? WHERE comment_id = ?";
				pstmt = conn.prepareStatement(query);
				pstmt.setString(1, content);
				pstmt.setInt(2, id);
				break;
			case "delete":
				query = "DELETE FROM comment WHERE comment_id = ?";
				pstmt = conn.prepareStatement(query);
				pstmt.setInt(1, id);
				break;
			}
			
			pstmt.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	

	
}
