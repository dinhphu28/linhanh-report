package com.idb.laauth.Utils.TOTP;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.jboss.aerogear.security.otp.Totp;
import org.jboss.aerogear.security.otp.api.Base32;
import org.springframework.stereotype.Component;

@Component
public class TOTPUtils {
    
    public String generateSecretKey() {
        String secret = Base32.random();

        return secret;
    }

    // generate QR code with 'otpauth://totp/user?secret=LRVLAZ4WVFOU3JBF&issuer=2fademo'

    public Boolean verifyTotp(String secret, String code) {
        Boolean isVerified = false;

        Totp totp = new Totp(secret);

        if(totp.verify(code)) {
            isVerified = true;
        }

        return isVerified;
    }

    public Boolean verifyOnlyOneCodeRequired(String secret, String code) {

        Boolean isVerified = false;

        CustomTotp totp = new CustomTotp(secret);

        if(totp.verify(code, 2, 2).isValid()) {
            isVerified = true;
        }

        return isVerified;
    }

    public Boolean verifyMultipleCodeRequired(String secret, List<String> codes) {
        CustomTotp totp = new CustomTotp(secret);

        // totp.verify(code, 2, 2);

        // check 25 hours into the past and future.
        long noOf30SecondsIntervals = TimeUnit.HOURS.toSeconds(25) / 30;

        CustomTotp.Result result = totp.verify(codes, noOf30SecondsIntervals, noOf30SecondsIntervals);

        return result.isValid();
    }
}
