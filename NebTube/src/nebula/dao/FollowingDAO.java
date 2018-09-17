package nebula.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;



public class FollowingDAO {
	public static void uploadFollowing(String followed, String following) {
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		try {
			String query = "INSERT INTO FOLLOWING(followed_username, following_username) VALUES (?,?)";
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, followed);
			pstmt.setString(2, following);
			System.out.println("Izgled queryija : " + pstmt.toString());
			pstmt.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	
	public static void deleteFollowing(String followed, String following) {
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		try {
			String query = "DELETE FROM FOLLOWING WHERE followed_username = ? AND following_username = ?";
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, followed);
			pstmt.setString(2, following);
			System.out.println("Izgled queryija : " + pstmt.toString());
			pstmt.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	

}
