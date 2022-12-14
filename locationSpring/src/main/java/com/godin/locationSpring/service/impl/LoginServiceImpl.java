package com.godin.locationSpring.service.impl;


import com.godin.locationSpring.model.Utilisateur;
import com.godin.locationSpring.service.LoginService;
import com.godin.locationSpring.service.UtilisateurService;
import com.godin.locationSpring.util.JWTUtils;
import com.godin.locationSpring.vo.ErrorCode;
import com.godin.locationSpring.vo.Result;
import com.godin.locationSpring.vo.params.LoginParam;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UtilisateurService utilisateurService;

    @Override
    public Result login(LoginParam loginParam) {
        String courriel = loginParam.getCourriel();
        String password = loginParam.getPassword();
        if (StringUtils.isBlank(courriel) || StringUtils.isBlank(password)) {
            return Result.fail(ErrorCode.PARAMS_ERROR.getCode(), ErrorCode.PARAMS_ERROR.getMsg());
        }
        Utilisateur utilisateur = utilisateurService.findUtilisateurByCourrielAndPassword(courriel, password);
        if (utilisateur == null) {
            return Result.fail(ErrorCode.ACCOUNT_PWD_NOT_EXIST.getCode(), ErrorCode.ACCOUNT_PWD_NOT_EXIST.getMsg());
        }
        String token = JWTUtils.createToken(utilisateur.getId(), role);

        utilisateur.getRole
        return Result.success(token, role);
    }
}
