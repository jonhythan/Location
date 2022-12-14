package com.godin.locationSpring.controller;

import com.godin.locationSpring.model.Utilisateur;
import com.godin.locationSpring.service.LoginService;
import com.godin.locationSpring.service.UtilisateurService;
import com.godin.locationSpring.util.JWTUtils;
import com.godin.locationSpring.vo.Result;
import com.godin.locationSpring.vo.params.LoginParam;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private UtilisateurService utilisateurService;

    public Utilisateur loginTest(Utilisateur utilisateur) {
        try {
            Utilisateur utilisateurServiceById = utilisateurService.findUtilisateurByCourriel(utilisateur.getCourriel());
            if (utilisateurServiceById != null
                    && utilisateurServiceById.getCourriel().equals(utilisateur.getCourriel())
                    && utilisateurServiceById.getPassword().equals(utilisateur.getPassword())) {
                utilisateurServiceById.setToken(JWTUtils.createToken(utilisateurServiceById.getId()));

                return utilisateurServiceById;
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public Result login(@RequestBody LoginParam loginParam) {
        return loginService.login(loginParam);
    }

    @GetMapping("/checkToken")
    public Boolean checkToken(HttpServletRequest request) {
        String token = request.getHeader("token");
        JWTUtils.checkToken(token);
        return null;
    }


   /* @PostMapping
    public Result login() {

        sessionStorage.setItem('key', 'value')
        sessionStorage.id = id
        sessionStorage.token = token

        sessionStorage.getItem('key')
        sessionStorage.token


        return loginService.login();
    }*/
}
