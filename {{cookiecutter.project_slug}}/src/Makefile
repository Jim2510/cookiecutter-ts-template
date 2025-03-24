.PHONY: terraform-fmt terraform-init terraform-validate pr
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

pr:
	hub pull-request -b develop -m "[develop] $(BRANCH)"
	hub pull-request -b master -m "[master] $(BRANCH)"