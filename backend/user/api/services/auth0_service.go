package services

type Auth0Service struct {
}

func NewAuth0Service() Auth0Service {
	return Auth0Service{}
}

func (s *Auth0Service) GetAuth0() string {
	return "Hello World"
}
