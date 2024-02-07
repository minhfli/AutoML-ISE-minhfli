terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.35.0"
    }
  }

}

locals {
  instance_type            = "t2.xlarge"
  ami_id                   = "ami-0e5d58de654dfb50d"
  aws_iam_instance_profile = "solana_is_good"
  user_name                = "{{bucket_name}}"
  key_name                 = "xuananle"
  project_name             = "{{project_name}}"
  region                   = "ap-southeast-1"
}
provider "aws" {
  region = local.region
} 

data "aws_iam_instance_profile" "existing_role" {
  name = local.aws_iam_instance_profile
}

resource "aws_instance" "example" {
  ami                  = local.ami_id
  instance_type        = local.instance_type
  key_name             = local.key_name
  iam_instance_profile = data.aws_iam_instance_profile.existing_role.role_name
  user_data            = templatefile("user_data.sh.tpl", {
    bucket_name  = local.user_name,
    project_name = local.project_name
  }
  )
  tags = {
    Name = "${local.user_name}-${local.project_name}"
  }
}
output "ec2_instance_info" {
  description = "Information about the EC2 instance"
  value       = {
    public_ip = aws_instance.example.public_ip
    tags      = aws_instance.example.tags.Name
  }
}
