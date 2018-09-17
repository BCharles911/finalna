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

import nebula.dao.LikeDislikeDAO;
import nebula.model.LikeDislike;
import nebula.model.User;
import nebula.model.VideoComm;



public class LikeDislikeServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

    public LikeDislikeServlet() {
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
		

		
		String videoOrCommentString = (String)request.getParameter("videoOrComment");
		int videoOrCommentID = Integer.parseInt(request.getParameter("videoOrCommentID"));
		String likeOrDislike = (String)request.getParameter("likeOrDislike");
		
		
		
		if(userStatus.equals("Authenticated")) {
			boolean isLike = likeOrDislike.equals("like")? true : false;
			LocalDate created = LocalDate.now();
			VideoComm videoOrComment = VideoComm.VIDEO;
			
			switch(videoOrCommentString) {
			case "video":
				videoOrComment = VideoComm.VIDEO;
				break;
			case "comment":
				videoOrComment = VideoComm.COMMENT;
			}
			
			LikeDislike likeDislike = new LikeDislike(isLike,loggedInUser.getUsername(), created, videoOrComment, videoOrCommentID);
			LikeDislikeDAO.uploadLikeDislike(likeDislike);
		} 
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("message", "success");
		data.put("userStatus",userStatus);
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(data);
		response.setContentType("application/json");
		response.getWriter().write(jsonData);
		
	}


}
