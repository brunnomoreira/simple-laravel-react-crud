# Simple Laravel React CRUD
A simple platform for creating and managing job openings and applications. Developed in the form of a SPA using laravel and react.

## Table Of Content
- [Tecnologies](#tecnologies)
- [Install and setup](#install-and-setup)

## Tecnologies
- [Laravel](https://laravel.com/)
- [React](https://reactjs.org/)
- [Vite](https://laravel.com/docs/9.x/vite)
- [Axios](https://axios-http.com/docs/intro)
- [React MUI](https://mui.com/)
- [React Query](https://react-query-v3.tanstack.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

## Install and setup
```bash
# 1. Clone the repo
$ git clone https://github.com/brunnomoreira/simple-laravel-react-crud.git

# 2. Navigate to folder
$ cd simple-laravel-react-crud

# 3. Create .env file
$ cp .env.example .env

# 4. install composer dependencies
$ docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs

# 5. Start laravel sail
$ ./vendor/bin/sail up -d

# 6. Run migrations and seeds
$ ./vendor/bin/sail artisan migrate:fresh --seed

# 7. Generate application key
$ ./vendor/bin/sail artisan key:generate

# 8. Install npm dependencies 
$ ./vendor/bin/sail npm install --legacy-peer-deps

# 9. Start react application
$ ./vendor/bin/sail npm run dev

# 10. Access the application
$ http://localhost/
```