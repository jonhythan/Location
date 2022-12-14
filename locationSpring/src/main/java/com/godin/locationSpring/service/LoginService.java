package com.godin.locationSpring.service;

import com.godin.locationSpring.vo.Result;
import com.godin.locationSpring.vo.params.LoginParam;

public interface LoginService {
    /**
     * La function de Login
     * @return
     */
    Result login(LoginParam loginParam);
}
