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

import nebula.dao.*;
import nebula.model.*;


public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public LoginServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			String username = request.getParameter("username");
			String password=  request.getParameter("password");
			String message = "success";
			
		
			
			
			if(UserDAO.doesUsernameExists(username) == false) {
				message = "Username doesn't exist";
				System.out.println(username);
				
			} else {
				if(UserDAO.getUser(username).getPassword().equals(password) == false) {
					message = "password is incorrect";
				} else {
					HttpSession session = request.getSession();
					session.setAttribute("loggedInUser", UserDAO.getUser(username));
				}
			}
			
			
			
			Map<String, Object> data = new HashMap<String, Object>();
			data.put("message", message);
			ObjectMapper mapper = new ObjectMapper();
			String jsonData = mapper.writeValueAsString(data);
			
			response.setContentType("application/json");
			response.getWriter().write(jsonData);
	}

}
