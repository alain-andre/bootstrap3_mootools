# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'bootstrap3_mootools/version'

Gem::Specification.new do |spec|
  spec.name          = "bootstrap3_mootools"
  spec.version       = Bootstrap3Mootools::VERSION
  spec.authors       = ["Alain ANDRE"]
  spec.email         = ["wordsbybird@gmail.com"]
  spec.summary       = "Allow the use of common boostrap 3 script with mootools"
  spec.description   = ""
  spec.homepage      = "https://github.com/alain-andre/bootstrap3_mootools"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"
  spec.add_dependency "railties", "~> 4.1"
end
