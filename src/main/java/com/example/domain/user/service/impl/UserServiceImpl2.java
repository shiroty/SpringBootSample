package com.example.domain.user.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.user.model.MUser;
import com.example.domain.user.service.UserService;
import com.example.repository.UserRepository;

@Service
@Primary
public class UserServiceImpl2 implements UserService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private PasswordEncoder encoder;

	@Transactional
	@Override
	public void signup(MUser user) {
		// 存在チェック
		boolean exists = repository.existsById(user.getUserId());
		if (exists) {
			throw new DataAccessException("ユーザが既に存在") {
			};
		}
		user.setDepartmentId(1);
		user.setRole("ROLE_GENERAL");
		// パスワード暗号化
		String rawPassword = user.getPassword();
		user.setPassword(encoder.encode(rawPassword));
		// insert
		repository.save(user);
	}

	@Override
	public List<MUser> getUsers(MUser user) {
		ExampleMatcher matcher = ExampleMatcher.matching().withStringMatcher(StringMatcher.CONTAINING).withIgnoreCase();
		return repository.findAll(Example.of(user, matcher));
	}

	@Override
	public MUser getUserOne(String userId) {
		Optional<MUser> option = repository.findById(userId);
		MUser user = option.orElse(null);
		return user;
	}

	@Transactional
	@Override
	public void updateUserOne(String userId, String password, String userName) {
		// パスワード暗号化
		String encryptPassword = encoder.encode(password);
		// ユーザ更新
		repository.updateUser(userId, encryptPassword, userName);
	}

	@Transactional
	@Override
	public void deleteUserOne(String userId) {
		repository.deleteById(userId);
	}

	@Override
	public MUser getLoginUser(String userId) {
		return repository.findLoginUser(userId);
	}
}
