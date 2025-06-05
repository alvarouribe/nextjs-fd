"use client";
import { useState } from "react";
import { SelectWrapperOption } from "@/utils/types";
import InputSelect from "@/components/InputSelect";

export default function AboutPage() {
  const [fruit, setFruit] = useState<SelectWrapperOption | null>(null);
  const staticOptions: SelectWrapperOption[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  return (
    <main data-test="home-page" className="mt-40 container mx-auto min-h-80">
      <InputSelect
        value={fruit}
        onChange={setFruit}
        options={staticOptions}
        label="Favorite Fruit"
        placeholder="Select a fruit"
        prefixIcon="close"
        isRequired
      />
    </main>
  );
}