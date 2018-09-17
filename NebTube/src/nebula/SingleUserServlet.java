package nebula;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import nebula.dao.UserDAO;
import nebula.dao.VideoDAO;
import nebula.model.User;
import nebula.model.User_Role;
import nebula.model.Video;
import nebula.model.Video_Visibility;






public class SingleUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public SingleUserServlet() {
        super();
        
    }


    
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String userStatus = "Authenticated";
		HttpSession session = request.getSession();
		User loggedInUser = (User)session.getAttribute("loggedInUser");
		if(loggedInUser == null) {
			userStatus = "Unauthenticated";
			
		} else {
			loggedInUser = UserDAO.getUser(loggedInUser.getUsername());
		}
		
		String username = request.getParameter("username");
		User user = UserDAO.getUser(username);
		
		ArrayList<Video> userVideos = new ArrayList<Video>();
		
		userVideos = VideoDAO.getVideoForUser(username);
		

		Map<String, Integer> usersFollowing = new HashMap<String,Integer>();
		
		
		if(!user.getfollowing().isEmpty()) {
			usersFollowing = UserDAO.getFollowing(user.getfollowing());
		}
		
		int numberOfFollowers = UserDAO.getNumberOfFollowersForUser(username);
		
		ArrayList<Video> filteredVideos = new ArrayList<Video>();
		
		if(userStatus.equals("Authenticated")) {
			if(loggedInUser.getRole().equals(User_Role.ADMINISTRATOR) || loggedInUser.getUsername().equals(username)) {
				filteredVideos = userVideos;
			}else {
				for(Video vid : userVideos) {
					if(vid.getvisibility().equals(Video_Visibility.PUBLIC)) {
						filteredVideos.add(vid);
					}
				}
			}
		}
		

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("user", user);
		data.put("userVideos", filteredVideos);
		data.put("userFollowing", usersFollowing);
		data.put("userStatus", userStatus);
		data.put("numberOfFollowers",numberOfFollowers);
		if(userStatus == "Authenticated") {
			data.put("loggedInUser", loggedInUser);
		}
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(data);
		
		response.setContentType("application/json");
		response.getWriter().write(jsonData);
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String userUsername = (String)request.getParameter("userUsername");
		String action = (String)request.getParameter("action");
		String newValue = (String)request.getParameter("newValue");
		
		UserDAO.updateForUser(userUsername, action, newValue);
		
		Map<String,Object> data = new HashMap<String, Object>();
		data.put("message", "success");
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(data);
		response.setContentType("application/json");
		response.getWriter().write(jsonData);
	}

}
