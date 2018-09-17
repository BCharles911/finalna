package nebula.model;



public enum Video_Visibility {
	PUBLIC,
	UNLISTED,
	PRIVATE;
	
	public static Video_Visibility getVisibilityOfAVideo(int x) {
		switch (x) {
		case 1:
			return PUBLIC;
		case 2:
			return UNLISTED;

		default:
			return PRIVATE;
		}
	}

	
	public static int getVideoVisibilityInt(Video_Visibility VisibilityOfAVideo) {
		switch (VisibilityOfAVideo) {
		case PUBLIC:
			return 1;
		case UNLISTED:
			return 2;

		default:
			return 0;
		}
	}
}
