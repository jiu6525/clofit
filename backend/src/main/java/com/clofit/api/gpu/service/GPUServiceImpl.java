package com.clofit.api.gpu.service;

import com.clofit.api.gpu.dao.GPUDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GPUServiceImpl implements GPUService {

    @Autowired
    private GPUDao s3Dao;

    @Override
    public String upload(String path, MultipartFile image) {
        return s3Dao.upload(path, image);
    }
}
