package com.clofit.api.color.service;

import com.clofit.api.color.entity.Color;
import com.clofit.api.color.repository.ColorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {

    private final ColorRepository colorRepository;

    @Override
    public List<Color> getColors() {
        return colorRepository.findAll();
    }
}
