package nebula;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import nebula.dao.ConnectionManager;



public class InitListener implements ServletContextListener {
	
    public void contextDestroyed(ServletContextEvent arg0)  { 
   }

   public void contextInitialized(ServletContextEvent arg0)  { 
   	
        System.out.println("Inicijalizacija");
        
        ConnectionManager.open();
        
        
        System.out.println("Inicijalizacija zavrsena");
   }
	

}
