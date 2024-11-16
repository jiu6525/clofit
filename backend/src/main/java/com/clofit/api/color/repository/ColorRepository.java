package com.clofit.api.color.repository;

import com.clofit.api.color.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ColorRepository extends JpaRepository<Color, Long> {

}
