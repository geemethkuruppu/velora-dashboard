import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

const ConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'warning' // 'warning', 'danger', 'success'
}) => {
    if (!isOpen) return null;

    const typeStyles = {
        warning: {
            icon: AlertCircle,
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
            confirmBg: 'bg-amber-500 hover:bg-amber-600',
        },
        danger: {
            icon: AlertCircle,
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            confirmBg: 'bg-red-500 hover:bg-red-600',
        },
        success: {
            icon: CheckCircle,
            iconBg: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
            confirmBg: 'bg-emerald-500 hover:bg-emerald-600',
        }
    };

    const style = typeStyles[type];
    const Icon = style.icon;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[24px] p-6 shadow-2xl border border-black/5 w-full max-w-md animate-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-main transition-colors rounded-full hover:bg-gray-100"
                >
                    <X size={18} />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full ${style.iconBg} flex items-center justify-center`}>
                        <Icon size={32} className={style.iconColor} />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-primary tracking-tight mb-2">{title}</h3>
                    <p className="text-sm text-text-muted">{message}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 rounded-xl border border-black/10 text-sm font-bold text-primary hover:bg-gray-50 transition-all"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white transition-all ${style.confirmBg}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
