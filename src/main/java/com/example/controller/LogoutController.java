package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LogoutController {

	/*
	 * ログイン画面にリダイレクト
	 */
	@PostMapping("/logout")
	public String postLogout() {
		return "redirect:/login";
	}
}
