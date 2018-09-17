package nebula.model;




	public enum VideoComm {

		VIDEO,
		COMMENT;
		
		public static VideoComm getVideoOrComment(int x) {
			switch (x) {
			case 1:
				return VIDEO;
			default:
				return COMMENT;
			}
		}
		
		public static int getVideoOrCommentId(VideoComm videoOrComment) {
			switch (videoOrComment) {
			case VIDEO:
				return 1;
			default:
				return 0;
			}
		}
	}


