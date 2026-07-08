package com.heyaatounisiya.backend.exception;

public class PhoneAlreadyExistsException extends RuntimeException {
    public PhoneAlreadyExistsException(String phone) {
        super("Un compte existe déjà avec le numéro de téléphone : " + phone);
    }
}
