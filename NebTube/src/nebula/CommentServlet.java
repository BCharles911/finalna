package nebula;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import nebula.dao.CommentDAO;
import nebula.dao.LikeDislikeDAO;
import nebula.model.LikeDislike;


public class CommentServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	
	public CommentServlet() {
		super();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int commentID = Integer.parseInt(request.getParameter("commentID"));
		ArrayList<LikeDislike> commentLD = LikeDislikeDAO.getLikeDislikeForComment(commentID);
		
		System.out.println("Pristigli coment ID: " + commentID);
		for(LikeDislike ld : commentLD) {
			System.out.println(ld.getOwnerUsername() + ld.isLike());
		}
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("commentLikesDislikes", commentLD);
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(data);
		
		response.setContentType("application/json");
		response.getWriter().write(jsonData);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		String status = "success";
		
		String action = (String)request.getParameter("action");
		int commentID = Integer.parseInt(request.getParameter(("commentID")));
		String content = (String)request.getParameter("content");
		
		
		CommentDAO.updateForComment(action,content,commentID);
		
		Map<String,Object> data = new HashMap<String, Object>();
		data.put("message", status);
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(data);
		response.setContentType("application/json");
		response.getWriter().write(jsonData);
		
	}
	

}
