type Donation = {
  donor_id: string;
  donor_name: string;
  contact_email?: string;
  contact_phone?: string;
  district: string;
  status: DonationStatus;
  category: DonationCategory;
  description: string;
  quantity: QuantityRange;
  condition?: ItemCondition;
  preferred_collection_date?: Date;
  needs_pickup?: boolean;
  created_at: Date;
};
