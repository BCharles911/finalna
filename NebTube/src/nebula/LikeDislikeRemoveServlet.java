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

import nebula.dao.LikeDislikeDAO;
import nebula.model.User;
import nebula.model.VideoComm;



public class LikeDislikeRemoveServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    

    public LikeDislikeRemoveServlet() {
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
		
		if(userStatus == "Authenticated") {
			VideoComm videoOrComment = VideoComm.VIDEO;
			
			switch(videoOrCommentString) {
			case "video":
				videoOrComment = VideoComm.VIDEO;
				break;
			case "comment":
				videoOrComment = VideoComm.COMMENT;
			}
			
			LikeDislikeDAO.removeLikeDislike(videoOrComment, videoOrCommentID, loggedInUser.getUsername());
		}
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("userStatus",userStatus);
		data.put("message", "success");
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(data);
		response.setContentType("application/json");
		response.getWriter().write(jsonData);
	}

}
