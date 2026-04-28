Feature: Property Listing Management

  Rule: Price is mandatory for publication
    Scenario: Owner publishes a listing with a price
      Given a listing with a price greater than 0
      When the owner publishes the listing
      Then the listing status becomes "PUBLISHED"

    Scenario: Owner cannot publish a listing without a price
      Given a listing with a price of 0
      When the owner tries to publish the listing
      Then the publication is rejected with "Price is required"

    Scenario: Owner cannot publish an already published listing
      Given a listing that is already published
      When the owner tries to publish it again
      Then the publication is rejected with "Listing already published"

    Scenario: Owner updates a listing before publishing
      Given a drafted listing with a price
      When the owner updates the number of bedrooms
      Then the listing details are updated

    Scenario: Owner cannot update a published listing price to zero
      Given a published listing
      When the owner tries to set the price to 0
      Then the update is rejected with "Price must be greater than 0"
