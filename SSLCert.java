import java.applet.Applet;
//import java.awt.*;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSession;
import java.security.MessageDigest;
import java.net.URL;
import java.rmi.RMISecurityManager;
import java.security.AccessController;
import java.security.PrivilegedAction;

public class SSLCert extends Applet
{

	 public static int initDone = 0;
	 static String result;
     public void init()
     {
		java.lang.System.out.println("Applet started");
	 }

     public void stop()
     {
     }

	public static String getCertFingerprint(final String hostname, final int port)
	{
		String ret = (String)java.security.AccessController.doPrivileged(
		new java.security.PrivilegedAction()
		{
			public String run() {
		
			StringBuilder sb = new StringBuilder(200);
			try {
				SSLSocketFactory sslsocketfactory = (SSLSocketFactory)SSLSocketFactory.getDefault();
				SSLSocket socket = (SSLSocket)
	sslsocketfactory.createSocket(hostname, port);
				SSLSession session = socket.getSession();
				MessageDigest md = MessageDigest.getInstance("MD5");
				md.update(session.getPeerCertificates()[0].getEncoded());
				for (byte b : md.digest()) {
				if (sb.length() > 0)
					sb.append(':');
					sb.append(String.format("%02x", b));
				}
	
			} catch (Exception exception) {
				java.lang.System.out.println("Something failed");
					
				return null;
			}
			return sb.toString();
			}
		});
		return ret;
	}
}
