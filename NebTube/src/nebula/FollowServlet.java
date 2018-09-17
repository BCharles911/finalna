package nebula;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import nebula.dao.FollowingDAO;
import nebula.model.User;



public class FollowServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    

    public FollowServlet() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userStatus = "Authenticated";
		HttpSession session = request.getSession();
		User loggedInUser = (User)session.getAttribute("loggedInUser");
		if(loggedInUser == null) {
			userStatus = "Unauthenticated";
		}
		
		
		String action = (String)request.getParameter("action");
		String followed = (String)request.getParameter("username");
		
		System.out.println("-------PARAMETRI U UPLOAD FOLLOWING SERVLETUU");
		System.out.println("action: " + action);
		System.out.println("followed: " + followed);
		
		if(userStatus.equals("Authenticated")) {
			if(action.equals("follow")) {
				FollowingDAO.uploadFollowing(followed, loggedInUser.getUsername());
			} else if(action.equals("unfollow")) {
				FollowingDAO.deleteFollowing(followed, loggedInUser.getUsername());
			}
		}
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("userStatus", userStatus);
		data.put("message", "success");
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(data);
		response.setContentType("application/json");
		response.getWriter().write(jsonData);

	}
}
