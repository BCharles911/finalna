package nebula.model;

public enum User_Role {
	
	ADMINISTRATOR,
	USER;
	
	public static User_Role getUserRole(int r) {
		switch(r) {
		case 1:
			return ADMINISTRATOR;
			default:
				return USER;
		}
	}
	
	public static int getUserRoleInt(User_Role userRole) {
		switch(userRole) {
		case ADMINISTRATOR:
			return 1;
		default:
			return 0;
		}
	}

}
