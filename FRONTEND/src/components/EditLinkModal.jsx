import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link2, Calendar, MousePointerClick } from "lucide-react";
import { updateUrl } from "../store/slices/urlSlice";
import { Modal, Button, Input, Alert } from "./ui";

export const EditLinkModal = ({ isOpen, onClose, link }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.url);

  const [formData, setFormData] = useState({
    originalUrl: "",
    expiresAt: "",
    maxClicks: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (link) {
      setFormData({
        originalUrl: link.originalUrl || "",
        expiresAt: link.expiresAt
          ? new Date(link.expiresAt).toISOString().slice(0, 16)
          : "",
        maxClicks: link.maxClicks || "",
      });
    }
  }, [link]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.originalUrl) {
      errors.originalUrl = "Original URL is required";
    } else {
      try {
        new URL(formData.originalUrl);
      } catch {
        errors.originalUrl = "Please enter a valid URL";
      }
    }

    if (formData.expiresAt && new Date(formData.expiresAt) <= new Date()) {
      errors.expiresAt = "Must be a future date";
    }

    if (
      formData.maxClicks &&
      (isNaN(formData.maxClicks) || formData.maxClicks < 1)
    ) {
      errors.maxClicks = "Must be a positive number";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const urlData = {
      originalUrl: formData.originalUrl,
      expiresAt: formData.expiresAt || null,
      maxClicks: formData.maxClicks ? parseInt(formData.maxClicks) : null,
    };

    const result = await dispatch(updateUrl({ id: link._id, urlData }));

    if (!result.error) {
      onClose();
    }
  };

  if (!link) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Link" size="md">
      {error && <Alert type="error" message={error} className="mb-4" />}

      <div className="mb-4 p-4 rounded-xl bg-white/5 border border-stone-800">
        <p className="text-sm text-gray-400 mb-1">Short URL</p>
        <p className="text-white font-medium font-[Open Sans]">/{link.slug}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="url"
          name="originalUrl"
          label="Original URL"
          placeholder="https://example.com/your-long-url"
          value={formData.originalUrl}
          onChange={handleChange}
          error={formErrors.originalUrl}
          icon={Link2}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="datetime-local"
            name="expiresAt"
            label="Expires At (Optional)"
            value={formData.expiresAt}
            onChange={handleChange}
            error={formErrors.expiresAt}
            icon={Calendar}
            helperText="Link expires after this date"
            min={new Date().toISOString().slice(0, 16)}
          />

          <Input
            type="number"
            name="maxClicks"
            label="Max Clicks (Optional)"
            placeholder="100"
            value={formData.maxClicks}
            onChange={handleChange}
            error={formErrors.maxClicks}
            icon={MousePointerClick}
            helperText="Link expires after N clicks"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            fullWidth
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth loading={isLoading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditLinkModal;
