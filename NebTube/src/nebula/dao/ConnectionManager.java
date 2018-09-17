package nebula.dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class ConnectionManager {
	
	private static final String DATABASE = "localhost:3306/nebulatube";
	private static final String USER_NAME = "root";
	private static final String PASSWORD = "root";
	
	private static Connection connection;
	
	public static void open() {
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://" + DATABASE + "?useSSL=false", USER_NAME, PASSWORD);
			
		}catch (Exception e ) {
			e.printStackTrace();
		}
	}
	
	public static void Close() {
		try {
			connection.close();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static Connection getConnection() {
		return connection;
	}

}
