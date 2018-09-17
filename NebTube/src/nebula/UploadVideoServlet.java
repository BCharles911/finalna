package nebula;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.fasterxml.jackson.databind.ObjectMapper;

import nebula.dao.VideoDAO;
import nebula.model.Video;
import nebula.model.Video_Visibility;


public class UploadVideoServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UploadVideoServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String videoName = (String)request.getParameter("videoname");
		String videoURL = (String)request.getParameter("videoURL");
		String imageURL = (String)request.getParameter("videoImage");
		
		String message = "success";
		String imgCheck = "";
		if(VideoDAO.videoNameExists(videoName)) {
			message = "video name already exists";
		}
		if(imageURL == "") {
			imgCheck = "fail";
		}
		
		Map<String, Object> data = new HashMap<String, Object>();
        data.put("nameParameter", videoName);
        data.put("URLparameter", videoURL);
        data.put("message", message);
        data.put("imgCheck", imgCheck);

        ObjectMapper mapper = new ObjectMapper();
    
        String jsonData = mapper.writeValueAsString(data);
        response.setContentType("application/json");
        response.getWriter().write(jsonData);	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uploadPath = "C:\\Users\\JECA\\Desktop\\web-master\\NebTube\\WebContent\\images\\videoImages";
		String videoName = "unknown";
		String initialVideoURL = "";
		String imageURL = "";
		String videoVisibility = "public";
		String ownerUsername = "";
		
		try {
		
			List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
			for(FileItem item : items) {

				if(!item.isFormField()) {					
					//Provera da li je slika
					if(item.getContentType().toString().split("/")[0].toString().equals("image")) {
						//System.out.println("It is picture");
						
						InputStream stream = item.getInputStream();
						BufferedImage io = ImageIO.read(stream);
						
						//Kreiranje nove instance kako bi se mogla resizovati stara slika
						BufferedImage resized = new BufferedImage(230,138,io.getType());
						Graphics2D g = resized.createGraphics();
						g.drawImage(io, 0, 0, 230, 138, 0, 0, io.getWidth(), io.getHeight(), null);
						g.dispose();
						
						imageURL = uploadPath + videoName + ".jpg";
						ImageIO.write(resized, "jpg", new File(imageURL));
						
						
						//VideoDAO.
						
						
					} else {
						System.out.println("Not picture");
						
					}

				}else {
		
					if(item.getFieldName().equals("name")) {
						videoName = item.getString();
					} else if(item.getFieldName().equals("videoURL")) {
						initialVideoURL = item.getString();
					} else if(item.getFieldName().equals("selectVisibility")){
						videoVisibility = item.getString();
					} else if(item.getFieldName().equals("ownerUsername")) {
						ownerUsername = item.getString();
					}

				}
			}
		} catch (FileUploadException e2) {
			e2.printStackTrace();
		}
		
		Video_Visibility visibility = Video_Visibility.PUBLIC;
		switch(videoVisibility) {
		case "public":
			visibility = Video_Visibility.PUBLIC;
			break;
		case "unlisted":
			visibility = Video_Visibility.UNLISTED;
			break;
		case "private":
			visibility = Video_Visibility.PRIVATE;
			break;
		}
		String description = "";
		boolean commentsAllowed = true;
		boolean ratingVisibility = true;
		boolean blocked = false;
		int views = 0;
		LocalDate created = LocalDate.now();
		imageURL = "images/videoImages/" + videoName + ".jpg";
		String videoURL = "";
		try {
			videoURL = initialVideoURL.replace("width=\"560\" height=\"315\"", "width=\"100%\" height=\"100%\"");
			if(!videoName.equals("") && !videoURL.equals("")) {
				Video video = new Video(videoName, videoURL, imageURL, description, visibility, commentsAllowed, ratingVisibility, blocked, views, created, ownerUsername);
				
				//Funkcija vraca generisani kljuc iz baze
				int generatedID =  VideoDAO.uploadVideo(video);
				
				response.sendRedirect("./oneVideo.html?id=" + generatedID);
			} else {
				response.sendRedirect("./index.html");
			}
		} catch (Exception e) {
			System.out.println("Bad format");
		}
		
		
		
		
		
		
	}

}
