package com.example.domain.user.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="t_salary")
public class Salary {
	@EmbeddedId
	private SalaryKey salaryKey;
	private Integer salary;
}
