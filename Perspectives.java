import java.applet.Applet;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSession;
import java.security.MessageDigest;
import java.net.URL;
import java.rmi.RMISecurityManager;
import java.security.AccessController;
import java.security.PrivilegedAction;
import java.security.cert.CertificateFactory;
import java.security.cert.Certificate;
import java.security.*;
import java.security.spec.*;
import org.apache.commons.codec.binary.*;

public class Perspectives extends Applet
{

    public void init()
    {
		java.lang.System.out.println("Applet started 0");
	}

    public void stop()
    {
		java.lang.System.out.println("Applet stopping");
	}
	
	public static boolean verifySignature(String data, 
				String signature, String publicKey)
	{
		try {
			PublicKey pub = null;
			byte[] certificateBytes = null;
			Certificate cert = null;
			Signature signer = Signature.getInstance("MD5withRSA");
			boolean result;
			X509EncodedKeySpec spec =
					new X509EncodedKeySpec(Base64.decodeBase64(publicKey));
			KeyFactory kf = KeyFactory.getInstance("RSA");
			
			pub = kf.generatePublic(spec);	
			signer.initVerify(pub);
			signer.update(Base64.decodeBase64(data));
	
			result = (signer.verify(Base64.decodeBase64(signature)));
			java.lang.System.out.println("result:"+result);
			return result;
		} catch (Exception e) {
			java.lang.System.out.println(e);
			return false;
		}	
	}
	public static String getCertFingerprint(final String hostname, 
				final int port)
	{
		String ret = (String)java.security.AccessController.doPrivileged(
		new java.security.PrivilegedAction()
		{
			public String run() {
		
			StringBuilder sb = new StringBuilder(200);
			try {
				SSLSocketFactory sslsocketfactory = 
						(SSLSocketFactory)SSLSocketFactory.getDefault();
				SSLSocket socket = 
					(SSLSocket)sslsocketfactory.createSocket(hostname, port);
				SSLSession session = socket.getSession();
				MessageDigest md = MessageDigest.getInstance("MD5");
				md.update(session.getPeerCertificates()[0].getEncoded());
				for (byte b : md.digest()) {
				if (sb.length() > 0)
					sb.append(':');
					sb.append(String.format("%02x", b));
				}
	
			} catch (Exception e) {
				java.lang.System.out.println(e);
					
				return null;
			}
			return sb.toString();
			}
		});
		return ret;
	}
}
