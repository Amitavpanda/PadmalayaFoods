import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Address {
    name: string;
    phone: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    landmark?: string;
}

export const AddressForm = ({ onAddressSave }: { onAddressSave?: (address: Address) => void }) => {
    const [address, setAddress] = useState<Address>({
        name: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        landmark: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate form
        if (!address.name || !address.phone || !address.streetAddress || !address.city ||
            !address.state || !address.postalCode) {
            toast.error('Please fill in all required fields.');
            setIsSubmitting(false);
            return;
        }

        // Save address
        setTimeout(() => {
            if (onAddressSave) {
                onAddressSave(address);
            }
            toast.success('Address saved successfully!');

            setIsSubmitting(false);
        }, 800);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={address.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={address.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Textarea
                    id="streetAddress"
                    name="streetAddress"
                    placeholder="Flat, House no., Building, Company, Apartment"
                    value={address.streetAddress}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="landmark">Landmark (Optional)</Label>
                <Input
                    id="landmark"
                    name="landmark"
                    placeholder="E.g. near bus stop"
                    value={address.landmark}
                    onChange={handleChange}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                        id="state"
                        name="state"
                        placeholder="State"
                        value={address.state}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={address.postalCode}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <Button
                type="submit"
                className="w-full bg-biryani-500 hover:bg-biryani-600"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Saving...' : 'Save Address'}
            </Button>
        </form>
    );
};
