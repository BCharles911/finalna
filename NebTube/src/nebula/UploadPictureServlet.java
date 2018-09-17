package nebula;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import nebula.dao.UserDAO;


public class UploadPictureServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    

    public UploadPictureServlet() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uploadPath = "C:\\WORKSPACE\\NebTube\\WebContent\\images\\userImages";
		String imageURL = "";
		String userUsername = "";
		try {
			List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
			for(FileItem item : items) {
				System.out.println(item.getFieldName());
				if(!item.isFormField()) {
					if(item.getContentType().toString().split("/")[0].toString().equals("image")) {
						InputStream stream = item.getInputStream();
						BufferedImage io = ImageIO.read(stream);
						
						//Kreiranje nove instance kako bi se mogla resizovati stara slika
						BufferedImage resized = new BufferedImage(250,250,io.getType());
						Graphics2D g = resized.createGraphics();
						g.drawImage(io, 0, 0, 250, 250, 0, 0, io.getWidth(), io.getHeight(), null);
						g.dispose();
						
						imageURL = uploadPath + userUsername + ".jpg";
						ImageIO.write(resized, "jpg", new File(imageURL));
						UserDAO.updateForUser(userUsername, "profilePictureURL", imageURL);
					}
				} else {
					userUsername = item.getString();
				}
			}
			response.sendRedirect("./singleUser.html?user="+userUsername+"");
		} catch (FileUploadException e) {
			
			e.printStackTrace();
			response.sendRedirect(".index.html");
		}
		

		
		
	}
}
