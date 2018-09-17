package nebula;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import nebula.dao.CommentDAO;
import nebula.model.Comment;
import nebula.model.User;



public class UploadCommentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public UploadCommentServlet() {
        super();

    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String message = "success";
		HttpSession session = request.getSession();
		User loggedInUser = (User)session.getAttribute("loggedInUser");
		if(loggedInUser == null) {
			message = "failure";
		}
		
		String commentContent = (String)request.getParameter("commentContent");
		int commentVideoID = Integer.parseInt(request.getParameter("commentVideoID"));
		LocalDate created = LocalDate.now();
		
		int newCommentID = 0;
		if(message.equals("success")) {
			String ownerUsername = loggedInUser.getUsername();
			Comment comment = new Comment(commentContent, created, ownerUsername, commentVideoID);
			newCommentID =  CommentDAO.uploadComment(comment);
		}
		
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("loggedInUser", loggedInUser);
		data.put("newCommentID", newCommentID);
		data.put("message", message);
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(data);
		response.setContentType("application/json");
		response.getWriter().write(jsonData);
		
		
	}
}
