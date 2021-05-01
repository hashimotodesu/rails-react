FROM ruby:2.7

# ENV RAILS_ENV=production

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update -qq \
  && apt-get install -y nodejs yarn mariadb-client
WORKDIR /app
COPY . /app
RUN bundle config --local set path 'vendor/bundle' \
  && bundle install

# RUN bundle exec rails assets:precompile
# CMD bundle exec rails s -p ${PORT:-3000} -b 0.0.0.0 