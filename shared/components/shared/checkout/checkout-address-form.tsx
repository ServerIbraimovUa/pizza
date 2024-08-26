import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput, FormTextarea } from "../form";

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <FormInput name="address" className="text-base" placeholder="Город" />
                <FormTextarea
                    name="comment"
                    rows={5}
                    className="text-base"
                    placeholder="Коментраий к заказу"
                />
            </div>
        </WhiteBlock>
    );
};
