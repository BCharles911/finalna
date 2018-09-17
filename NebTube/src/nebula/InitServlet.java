package nebula;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
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


public class InitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public InitServlet() {
        super();

    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		boolean initialFill = true;
		String userStatus = "Authenticated";
		
		HttpSession session = request.getSession();
		User loggedInUser = (User)session.getAttribute("loggedInUser");
		if(loggedInUser == null) {
			userStatus = "Unauthenticated";
		}
		
		String searchedFilter = (String)request.getParameter("searchedVideoFilter");
		String searchedByUserFilter = (String)request.getParameter("searchedByUserFilter");
		String searchedMinViewsFilter = (String)(request.getParameter("searchedMinViewsFilter"));
		String searchedMaxViewsFilter = (String)(request.getParameter("searchedMaxViewsFilter"));
		String searchedStartDateFilter = (String)request.getParameter("searchedStartDateFilter");
		String searchedEndDateFilter = (String)request.getParameter("searchedEndDateFilter");
		String sort = (String)request.getParameter("sort");
		
		
		int minViewsFilter = 0;
		int maxViewsFilter = Integer.MAX_VALUE;
		
		LocalDate startDateFilter = null;
		LocalDate endDateFilter =  null;
		
		if(searchedFilter != null ) {
			initialFill = false;
		}
		
		if(searchedMinViewsFilter != null) {
			minViewsFilter = Integer.parseInt(searchedMinViewsFilter);
			initialFill = false;
		}
		if(searchedMaxViewsFilter != null) {
			maxViewsFilter = Integer.parseInt(searchedMaxViewsFilter);
			initialFill = false;
		}
		if(searchedStartDateFilter != null) {
			startDateFilter = LocalDate.parse(searchedStartDateFilter);
			initialFill = false;
		}
		if(searchedEndDateFilter != null) {
			endDateFilter = LocalDate.parse(searchedEndDateFilter);
			initialFill = false;
		}
		ArrayList<Video> videos = VideoDAO.getAll(searchedFilter,searchedByUserFilter,minViewsFilter,maxViewsFilter,startDateFilter,endDateFilter, sort);

		ArrayList<Video> videosByOwner = VideoDAO.getVideosForQueriedUser("%"+searchedFilter+"%");
		
		ArrayList<Video> videosByComment = VideoDAO.getVideosForQueriedComment("%"+searchedFilter+"%");
		
		Map<String, Integer> top5Users = UserDAO.getTop5();
		
		ArrayList<User> users = UserDAO.getAll();
		
		ArrayList<Video> filteredVideos = new ArrayList<Video>();
		for(Video v : videos) {
			if(v.getvisibility().equals(Video_Visibility.PUBLIC)) {
				filteredVideos.add(v);
			}
		}
		if(userStatus.equals("Authenticated")) {
			if(loggedInUser.getRole().equals(User_Role.ADMINISTRATOR)) {
				filteredVideos = videos;
			}
		}
		
		ArrayList<String> allUsers = UserDAO.getAllUsernames();

		

		
		
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("videos", filteredVideos);
        data.put("userStatus", userStatus);
        if(userStatus == "Authenticated") {
        	data.put("loggedInUser", loggedInUser.getUsername());
        }
        data.put("initialFill", initialFill);
        data.put("videosByOwnerQuery", videosByOwner);
        data.put("videosByCommentQuery", videosByComment);
        data.put("allUsers", allUsers);
        data.put("top5", top5Users);
        data.put("allUsersForEdit", users);
        ObjectMapper mapper = new ObjectMapper();
    
        String jsonData = mapper.writeValueAsString(data);
        response.setContentType("application/json");
        response.getWriter().write(jsonData);
		
	}

		

	
	
	
	


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
