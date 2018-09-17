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

import nebula.dao.LikeDislikeDAO;
import nebula.dao.UserDAO;
import nebula.dao.VideoDAO;
import nebula.model.Comment;
import nebula.model.LikeDislike;
import nebula.model.User;
import nebula.model.Video;



public class OneVideoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public OneVideoServlet() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userStatus = "Authenticated";
		
		HttpSession session = request.getSession();
		User loggedInUser = (User)session.getAttribute("loggedInUser");
		if(loggedInUser == null) {
			userStatus = "Unauthenticated";
		}
		
		int videoID = Integer.parseInt(request.getParameter("videoID"));
		Video video = VideoDAO.getVideo(videoID);
		
		ArrayList<LikeDislike> videoLikesDislikes = VideoDAO.getLikesDislikesForVideo(videoID);
		ArrayList<Comment> videoComments = VideoDAO.getCommentsForVideo(videoID);
		ArrayList<LikeDislike> commentLikeDislike = LikeDislikeDAO.getAllForComment();
		
		//Update usera
		if(userStatus.equals("Authenticated")) {
			loggedInUser = UserDAO.getUser(loggedInUser.getUsername());
		}
		
		boolean videoOwnerBlocked = UserDAO.isUserBlocked(video.getOwnerUsername()) == 1? true : false;
		
		
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("video", video);
		data.put("videoLikesDislikes", videoLikesDislikes);
		data.put("comments", videoComments);
		data.put("commentsLikeDislike", commentLikeDislike);
		data.put("userStatus", userStatus);
		data.put("videoOwnerBlocked", videoOwnerBlocked);
		if(userStatus == "Authenticated") {
			data.put("loggedInUser", loggedInUser);
		}
		ObjectMapper mapper = new ObjectMapper();
		
		String jsonData = mapper.writeValueAsString(data);
		response.setContentType("application/json");
		response.getWriter().write(jsonData);
	
	
	
	
	
	
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		int videoID = Integer.parseInt(request.getParameter("videoID"));
		String parameter = (String)request.getParameter("parameter");
		String value = (String)request.getParameter("value");
		
		System.out.println("Parametri u post video servletu");
		
		
		VideoDAO.updateForVideo(videoID, parameter,value);
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("message", "success");
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(data);
		response.setContentType("application/json");
		response.getWriter().write(jsonData);
		
		
		
		
		
	}

}
